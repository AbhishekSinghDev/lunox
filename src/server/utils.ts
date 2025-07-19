import type { ParsedSearchResult } from "@/lib/type";
import type {
  BraveSearchApiResponse,
  NewsResult,
  QA,
  SearchResult,
} from "@/services/brave/types";

export function parseSearchResults(searchRes: BraveSearchApiResponse) {
  const results: Array<ParsedSearchResult> = [];

  // Handle WebSearchApiResponse
  if (searchRes.type === "search") {
    const webSearchRes = searchRes;

    // Parse web search results
    if (webSearchRes.web?.results) {
      webSearchRes.web.results.forEach((item: SearchResult) => {
        const result = {
          type: "web",
          title: item.title,
          url: item.url,
          img: item.profile?.img,
          description: item.description,
          content: item.extra_snippets?.join(" ") ?? item.description,
          source: item.profile?.name,
          rating: item.rating?.ratingValue,
          date: item.page_age,
          category: item.article?.publisher?.name ?? item.profile?.name,
          keyPoints: [] as string[],
        };

        // Add structured data if available
        if (item.faq) {
          result.keyPoints.push(
            ...item.faq.map((qa) => `Q: ${qa.question} A: ${qa.answer}`),
          );
        }

        if (item.article?.date_published) {
          result.date = item.article.date_published;
        }

        if (item.rating?.ratingValue) {
          result.rating = item.rating.ratingValue;
        }

        // Add specialized content based on type
        if (item.product) {
          result.keyPoints.push(`Price: ${item.product.price}`);
          if (item.product.rating)
            result.rating = item.product.rating.ratingValue;
        }

        if (item.recipe) {
          result.keyPoints.push(
            `Cooking time: ${item.recipe.total_time ?? "N/A"}`,
          );
          if (item.recipe.ingredients) {
            result.keyPoints.push(
              `Ingredients: ${item.recipe.ingredients.slice(0, 5).join(", ")}`,
            );
          }
        }

        if (item.software) {
          result.keyPoints.push(
            `Language: ${item.software.ProgrammingLanguage ?? "N/A"}`,
          );
          if (item.software.stars)
            result.keyPoints.push(`Stars: ${item.software.stars}`);
        }

        // Limit content length for context management
        if (result.content && result.content.length > 500) {
          result.content = result.content.substring(0, 500) + "...";
        }

        results.push(result);
      });
    }

    // Parse news results
    if (webSearchRes.news?.results) {
      webSearchRes.news.results.forEach((item: NewsResult) => {
        const result = {
          type: "news",
          title: item.title,
          url: item.url,
          img: item.profile?.img,
          description: item.description,
          content: item.extra_snippets?.join(" ") ?? item.description,
          source: item.source ?? item.profile?.name,
          date: item.age,
          category: "news",
          keyPoints: item.breaking ? ["BREAKING NEWS"] : [],
        };

        if (result.content && result.content.length > 400) {
          result.content = result.content.substring(0, 400) + "...";
        }

        results.push(result);
      });
    }

    // Parse FAQ results
    if (webSearchRes.faq?.results) {
      webSearchRes.faq.results.forEach((item: QA) => {
        results.push({
          type: "faq",
          title: item.title,
          url: item.url,
          description: `Q: ${item.question}`,
          content: `A: ${item.answer}`,
          source: item.meta_url?.hostname,
          category: "faq",
        });
      });
    }

    // Parse infobox data
    if (webSearchRes.infobox?.results) {
      webSearchRes.infobox.results.forEach((item) => {
        const keyPoints = [];
        if (item.long_desc) keyPoints.push(item.long_desc);
        if (item.attributes) keyPoints.push(...item.attributes);

        results.push({
          type: "infobox",
          title: item.title,
          url: item.url,
          img: item.profile?.img,
          description: item.description,
          content: item.long_desc,
          source: item.profile?.name,
          category: item.category,
          keyPoints,
        });
      });
    }

    // Parse video results
    if (webSearchRes.videos?.results) {
      webSearchRes.videos.results.forEach((item) => {
        results.push({
          type: "video",
          title: item.title,
          url: item.url,
          img: item.profile?.img,
          description: item.description,
          content: item.video?.duration
            ? `Duration: ${item.video.duration}`
            : item.description,
          source: item.video?.creator ?? item.profile?.name,
          date: item.age,
          category: "video",
          keyPoints: item.video?.tags?.slice(0, 5) ?? [],
        });
      });
    }

    // Parse discussion results
    if (webSearchRes.discussions?.results) {
      webSearchRes.discussions.results.forEach((item) => {
        const keyPoints = [];
        if (item.data?.num_answers)
          keyPoints.push(`Answers: ${item.data.num_answers}`);
        if (item.data?.score) keyPoints.push(`Score: ${item.data.score}`);

        results.push({
          type: "discussion",
          title: item.title,
          url: item.url,
          img: item.profile?.img,
          description: item.description,
          content: item.data?.top_comment ?? item.description,
          source: item.data?.forum_name ?? item.profile?.name,
          category: "forum",
          keyPoints,
        });
      });
    }

    // Parse location results
    if (webSearchRes.locations?.results) {
      webSearchRes.locations.results.forEach((item) => {
        results.push({
          type: "location",
          title: item.title,
          url: item.url,
          img: item.profile?.img,
          description: item.description,
          content: item.postal_address?.displayAddress ?? item.description,
          source: item.profile?.name,
          category: item.category?.join(", ") ?? "location",
          rating: item.rating?.ratingValue,
          location: {
            address: item.postal_address?.displayAddress,
            coordinates: item.coordinates,
            contact: item.contact?.telephone ?? item.contact?.email,
            hours: item.opening_hours?.current_day?.[0]?.opens
              ? `${item.opening_hours.current_day[0].opens} - ${item.opening_hours.current_day[0].closes}`
              : undefined,
          },
          keyPoints: item.serves_cuisine ?? [],
        });
      });
    }
  }

  // Handle LocalPoiSearchApiResponse
  if (searchRes.type === "local_pois") {
    const localPoiRes = searchRes;

    localPoiRes.results?.forEach((item) => {
      results.push({
        type: "local_poi",
        title: item.title,
        url: item.url,
        img: item.profile?.img,
        description: item.description,
        content: item.postal_address?.displayAddress ?? item.description,
        source: item.profile?.name,
        category: item.category?.join(", ") ?? "local business",
        rating: item.rating?.ratingValue,
        location: {
          address: item.postal_address?.displayAddress,
          coordinates: item.coordinates,
          contact: item.contact?.telephone ?? item.contact?.email,
          hours: item.opening_hours?.current_day?.[0]?.opens
            ? `${item.opening_hours.current_day[0].opens} - ${item.opening_hours.current_day[0].closes}`
            : undefined,
        },
        keyPoints: [
          ...(item.serves_cuisine ?? []),
          ...(item.price_range ? [`Price: ${item.price_range}`] : []),
        ],
      });
    });
  }

  // Handle LocalDescriptionsSearchApiResponse
  if (searchRes.type === "local_descriptions") {
    const localDescRes = searchRes;

    localDescRes.results?.forEach((item) => {
      results.push({
        type: "local_description",
        title: `Local Info: ${item.id}`,
        url: "#",
        description: item.description,
        content: item.description,
        category: "local information",
      });
    });
  }

  // Sort by relevance and limit results
  return results
    .sort((a, b) => {
      const typeOrder = {
        web: 0,
        news: 1,
        faq: 2,
        infobox: 3,
        video: 4,
        discussion: 5,
        location: 6,
        local_poi: 7,
        local_description: 8,
      };
      return (
        (typeOrder[a.type as keyof typeof typeOrder] ?? 9) -
        (typeOrder[b.type as keyof typeof typeOrder] ?? 9)
      );
    })
    .slice(0, 12);
}
