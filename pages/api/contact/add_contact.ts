// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Contact } from "../../../redux/model/contact.model";
import path from "path";
import { promises as fs } from "fs";
export default async function handler(req: NextApiRequest, res: NextApiResponse<Array<Contact> | { message: string }>) {
    if (req.method === "POST") {
        try {
            const jsonDirectory = path.join(process.cwd(), "json");
            const fileContents = await fs.readFile(jsonDirectory + "/db.json", "utf8");
            const contactList: Contact[] = JSON.parse(fileContents);
            contactList.push({
                ...req.body,
                id: Math.random().toString().split(".")[1],
            });
            await fs.writeFile(jsonDirectory + "/db.json", JSON.stringify(contactList));
            res.status(200).json({
                message: "success"
            });
        } catch (err) {
            res.status(400).json({
                message: "fails",
            });
        }
        // res.status(200).json(contactList);
    } else {
        res.status(404).json({
            message: "api not found",
        });
    }
}
