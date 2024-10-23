import { Prisma } from "@prisma/client";

type Film = Prisma.filmGetPayload<null>;

type FilmWithRelations = Prisma.filmGetPayload<{
  include: {
    language_film_language_idTolanguage: true;
    language_film_original_language_idTolanguage: true;
    film_actor: true;
    film_category: true;
    inventory: true;
  };
}>;

type FilmCreateInput = Prisma.filmCreateInput;

type FilmUpdateInput = Prisma.filmUpdateInput;

export type { Film, FilmWithRelations, FilmCreateInput, FilmUpdateInput };
