// app/api/submit-quotation/route.ts
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const { customerName, contactInfo, serviceType, budget, details, slug } =
      await request.json();

    console.log("Request data:", { customerName, contactInfo, serviceType, budget, details, slug });

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }

    const quotationExists = await client
      .fetch(`*[_type == "quotation" && slug.current == $slug][0] {_id}`, { slug });

    console.log("Quotation exists:", quotationExists);

    if (!quotationExists) {
      return NextResponse.json(
        { success: false, error: `No quotation found for slug: ${slug}` },
        { status: 404 }
      );
    }

    const quotation = await client
      .patch({
        query: `*[_type == "quotation" && slug.current == $slug][0]`,
        params: { slug },
      })
      .setIfMissing({ requests: [] })
      .append("requests", [
        {
          _key: uuidv4(),
          _type: "request",
          customerName,
          contactInfo,
          serviceType,
          budget: budget ? Number(budget) : undefined,
          details,
          submittedAt: new Date().toISOString(),
        },
      ])
      .commit();

    console.log("Quotation updated:", quotation);

    return NextResponse.json({ success: true, quotation });
  } catch (error: any) {
    console.error("Error submitting quotation:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit quotation" },
      { status: 500 }
    );
  }
}
