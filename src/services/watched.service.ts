import mongoose from 'mongoose';
import { MovieService } from '@services/movie.service';

const WatchedSchema = new mongoose.Schema({
    userId: Number,
    movieId: Number,
}, { timestamps: true });

const Watched = mongoose.model('Watched', WatchedSchema);

export class WatchedService {
    static async markWatched(user: any, movieId: number) {
        const movie: any = await MovieService.getMovieById(movieId);
        if (!movie) {
            throw new Error('Movie not found');
        }

        const watched = await Watched.create({ userId: user.id, movieId });
        return watched;
    }

    static async unmarkWatched(user: any, movieId: number) {
        const watched = await Watched.findOneAndDelete({ userId: user.id, movieId });
        return watched;
    }

    static async getWatchedReport(user: any) {
        const watchedMovies = await Watched.find({ userId: user.id }).populate('movieId');
        return watchedMovies;
    }
}
