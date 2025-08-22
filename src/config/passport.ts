
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { enVars } from "./env";
import { User } from "../app/modules/user/user.model";
import { Role } from "../app/modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcrypt'



passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email: string, password: string, done) => {
        try {

             const isUserExist= await User.findOne({email}).lean()
            
                    
                       if(!isUserExist){ 
                         return done(null,false,{message:'User does not Exist'})
                
                       }
                       const isGoogleAuthenTicated= isUserExist.auths.some(providerObject=>providerObject.provider=='google')
                       if( isGoogleAuthenTicated &&!isUserExist.password){
                        return done("You have authenticated through Google. So if you want to login with credentials, then at first login with google and set a password for your Gmail and then you can login with email and password.")

                       }
            
                       const isPasswordMatched= await bcrypt.compare( password as string,isUserExist.password as string)
                       if(!isPasswordMatched){
                        
                           return done(null,false,{message:'Password does not match'})
                       }


                       done(null,isUserExist)
           


        } catch (error) {
            console.log(error);
            done(error)
        }
    })
)


passport.use(
    new GoogleStrategy(
        {
            clientID: enVars.GOOGLE_CLIENT_ID,
            clientSecret:enVars.GOOGLE_CLIENT_SECRET,
            callbackURL:enVars.GOOGLE_CALLBACK_URL
        }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {

            try {

                console.log('I am in passport')
                const email = profile.emails?.[0].value;

                if (!email) {
                    return done(null, false, { mesaage: "No email found" })
                }

                let user = await User.findOne({ email })

                if (!user) {
                    user = await User.create({
                        email,
                        name: profile.displayName,
                        picture: profile.photos?.[0].value,
                        role: Role.USER,
                        isVerified: true,
                        auths: [
                            {
                                provider: "google",
                                providerId: profile.id
                            }
                        ]
                    })
                }

                return done(null, user)


            } catch (error) {
                console.log("Google Strategy Error", error);
                return done(error)
            }
        }
    )
)

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id)
})

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch (error) {
        console.log(error);
        done(error)
    }
})