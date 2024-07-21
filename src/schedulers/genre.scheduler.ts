import { GenreService } from '@services/genre.service';

export class GenreScheduler {
    static start() {
        this.updateGenres();
        setInterval(() => {
            this.updateGenres();
        }, 2 * 60 * 60 * 1000);
    }

    static async updateGenres() {
        await GenreService.updateGenres();
    }
}
