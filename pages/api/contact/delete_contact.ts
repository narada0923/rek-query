// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Contact } from "../../../redux/model/contact.model";
import path from "path";
import { promises as fs } from "fs";
export default async function handler(req: NextApiRequest, res: NextApiResponse<Array<Contact> | { message: string }>) {
    if (req.method === "DELETE") {
        const { id } = req.query;
        try {
            const jsonDirectory = path.join(process.cwd(), "json");
            const fileContents = await fs.readFile(jsonDirectory + "/db.json", "utf8");
            const contactList: Contact[] = JSON.parse(fileContents);
            const updatedData: Contact[] = contactList.filter(el => el.id !== id);
            await fs.writeFile(jsonDirectory + "/db.json", JSON.stringify(updatedData));
            res.status(200).json({
                message: "success",
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
