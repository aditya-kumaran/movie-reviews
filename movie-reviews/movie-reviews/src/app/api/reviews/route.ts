import { NextRequest, NextResponse } from "next/server";
import { getReviewsCollection } from "@/lib/mongodb";
import { MovieReview } from "@/types/movie";

export async function GET() {
  try {
    const collection = await getReviewsCollection();
    const reviews = await collection.find({}).toArray();

    const formattedReviews: MovieReview[] = reviews.map((review) => ({
      id: review.id || review._id.toString(),
      title: review.title,
      releaseDate: review.releaseDate,
      genres: review.genres,
      rating: review.rating,
      classRecommendation: review.classRecommendation,
      intendedAudience: review.intendedAudience,
      rewatchability: review.rewatchability,
      bestCharacterWinner: review.bestCharacterWinner || review.bestCharacter || "",
      review: review.review || review.reviewComments || "",
      spoilerReview: review.spoilerReview || review.spoilerComments,
      reviewDate: review.reviewDate,
      tmdbId: review.tmdbId,
      posterPath: review.posterPath,
    }));

    return NextResponse.json(formattedReviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const review: MovieReview = await request.json();

    if (!review.title || !review.rating) {
      return NextResponse.json(
        { error: "Title and rating are required" },
        { status: 400 }
      );
    }

    const collection = await getReviewsCollection();

    const reviewToInsert = {
      ...review,
      id:
        review.id ||
        `${review.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${review.releaseDate?.split("-")[0] || "unknown"}`,
      reviewDate: review.reviewDate || new Date().toISOString().split("T")[0],
    };

    await collection.insertOne(reviewToInsert);

    return NextResponse.json(
      { message: "Review added successfully", review: reviewToInsert },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
}
