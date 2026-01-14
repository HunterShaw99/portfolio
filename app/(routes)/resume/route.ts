import {readFile} from "fs/promises";
import path from "path";

export async function GET() {
    const filePath = path.join(process.cwd(), "public/assets/HunterShawResume2026.pdf");
    const buffer = await readFile(filePath);

    const headers = new Headers();
    headers.append("Content-Disposition", 'attachment; filename="HunterShawResume2026.pdf"');
    headers.append("Content-Type", "application/pdf");
    headers.append("Cache-Control", "public, max-age=604800");
    return new Response(buffer, {headers});
}