import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.ts"

export const userResolvers = {
    Query: {
        me: async (_: any, __: any, context: any) => {
            if (!context.user) throw new Error("Unauthorized");
            return await User.findById(context.user.id);
        },
    },

    Mutation: {
        register: async (_: any, {firstName, lastName, email, password}: any) => {
            const existingUser = await User.findOne({email});
            if (existingUser) throw new Error("Email already registered");

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({firstName, lastName, email, password: hashedPassword});
            
            return await newUser.save();
        },


        login: async (_: any, {email, password}: any) => {
            const user = await User.findOne({email});
            if (!user) throw new Error("User not found");

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) throw new Error("Invalid password");

            const token = jwt.sign(
                {id: user._id, email: user.email},
                (process.env.JWT_SECRET as string),
                {expiresIn: "1d"}
            );

            return {token, user};
        },


    },

};
