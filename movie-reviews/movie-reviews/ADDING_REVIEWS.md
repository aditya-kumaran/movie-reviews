# How to Add New Movie Reviews

This guide explains how to add new movie reviews to the ReelReviews website.

## Data Format

Movie reviews are stored in `src/data/reviews.json`. Each review is a JSON object with the following structure:

```json
{
  "id": "movie-name-year",
  "title": "Movie Name",
  "releaseDate": "YYYY-MM-DD",
  "genres": ["Genre1", "Genre2"],
  "rating": 8.5,
  "classRecommendation": "Must Watch",
  "intendedAudience": "Description of who would enjoy this film",
  "rewatchability": "High - reason why",
  "bestCharacterWinner": "Character Name (Actor Name)",
  "review": "Your main review text here...",
  "spoilerReview": "Optional spoiler content here...",
  "reviewDate": "YYYY-MM-DD",
  "tmdbId": 12345
}
```

## Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier (use format: movie-name-year) |
| title | string | Yes | Movie title |
| releaseDate | string | Yes | Release date in YYYY-MM-DD format |
| genres | string[] | Yes | Array of genre names |
| rating | number | Yes | Your rating from 0-10 (decimals allowed) |
| classRecommendation | string | Yes | One of the predefined classes (see below) |
| intendedAudience | string | Yes | Who would enjoy this film |
| rewatchability | string | Yes | How rewatchable and why |
| bestCharacterWinner | string | Yes | Best character with actor name |
| review | string | Yes | Main review text (spoiler-free) |
| spoilerReview | string | No | Optional spoiler section |
| reviewDate | string | Yes | Date you wrote the review |
| tmdbId | number | No | TMDB movie ID for poster |

## Class Recommendations

Use one of these predefined values:
- "Must Watch"
- "Highly Recommended"
- "Worth Your Time"
- "Casual Viewing"
- "Skip It"
- "Guilty Pleasure"

## Adding Movie Posters

To display a movie poster, you need to:

1. Find the movie on [TMDB](https://www.themoviedb.org/)
2. Get the TMDB movie ID from the URL (e.g., themoviedb.org/movie/**12345**-movie-name)
3. Add the `tmdbId` to your review JSON
4. Add the poster path to `src/components/MovieCard.tsx` in the `posterMap` object:

```typescript
const posterMap: Record<number, string> = {
  // ... existing entries
  12345: "/poster-path-from-tmdb.jpg",
};
```

To find the poster path:
1. Go to the movie page on TMDB
2. Click on the poster image
3. The path is the filename (e.g., `/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg`)

## Example: Adding a New Review

1. Open `src/data/reviews.json`
2. Add a new object to the array:

```json
{
  "id": "the-godfather-1972",
  "title": "The Godfather",
  "releaseDate": "1972-03-24",
  "genres": ["Crime", "Drama"],
  "rating": 9.8,
  "classRecommendation": "Must Watch",
  "intendedAudience": "Fans of epic crime sagas and character-driven drama",
  "rewatchability": "Extremely High - reveals new layers with each viewing",
  "bestCharacterWinner": "Vito Corleone (Marlon Brando)",
  "review": "Francis Ford Coppola's masterpiece...",
  "spoilerReview": "The baptism sequence...",
  "reviewDate": "2024-05-01",
  "tmdbId": 238
}
```

3. Add the poster path to `MovieCard.tsx`:

```typescript
const posterMap: Record<number, string> = {
  // ... existing entries
  238: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
};
```

4. Rebuild and redeploy the site

## Rebuilding the Site

After making changes:

```bash
npm run build
```

The static files will be generated in the `out/` directory, ready for deployment.

## Available Genres

Current genres in use (you can add new ones):
- Action, Adventure, Animation, Biography, Comedy, Crime
- Dark Comedy, Drama, Fantasy, History, Romance, Sci-Fi, Thriller
