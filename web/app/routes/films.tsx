import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";

import { prisma } from "~/lib/db.server";

const ITEMS_PER_PAGE = 100;

export async function loader({ request }: LoaderFunctionArgs) {
  // URLから現在のページ番号を取得（デフォルトは1ページ目）
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");

  try {
    const [films, totalCount] = await Promise.all([
      prisma.film.findMany({
        include: {
          language_film_language_idTolanguage: true,
        },
        take: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
        orderBy: {
          last_update: "desc",
        },
      }),
      prisma.film.count(),
    ]);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    // ページ番号のバリデーション
    if (page < 1 || page > totalPages) {
      throw new Error("Invalid page number");
    }

    return json({
      films,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
      },
    });
  } catch (error) {
    console.error("Failed to fetch films:", error);
    throw new Response("Failed to fetch films", { status: 500 });
  }
}

export default function Films() {
  const { films, pagination } = useLoaderData<typeof loader>();
  console.log(films, pagination);

  return (
    <div>
      <h2>Films</h2>
    </div>
  );
}
