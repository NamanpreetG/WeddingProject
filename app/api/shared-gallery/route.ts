import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const revalidate = 60; // refresh every minute

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("asset_folder:wedding-shared")
      .max_results(100)
      .execute();

    const photos = result.resources.map((resource: { secure_url: string; public_id: string; width: number; height: number }) => ({
      thumb: cloudinary.url(resource.public_id, {
        quality: "auto",
        fetch_format: "auto",
        width: 800,
        crop: "limit",
        secure: true,
      }),
      full: cloudinary.url(resource.public_id, {
        quality: 100,
        fetch_format: "auto",
        secure: true,
      }),
      width: resource.width,
      height: resource.height,
      alt: resource.public_id.split("/").pop() ?? "Shared photo",
    }));

    return NextResponse.json({ photos });
  } catch (error) {
    console.error("Shared gallery fetch error:", error);
    return NextResponse.json({ photos: [] }, { status: 500 });
  }
}
