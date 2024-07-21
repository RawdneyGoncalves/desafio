import axios from 'axios';
import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
    id: Number,
    name: String,
}, { timestamps: true });

const Genre = mongoose.model('Genre', GenreSchema);

export class GenreService {
    static async getAll(page: number = 1, limit: number = 10) {
        return Genre.find().skip((page - 1) * limit).limit(limit);
    }

    static async updateGenres() {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
            params: {
                api_key: process.env.TMDB_API_KEY,
            },
        });
        const genres = response.data.genres;
        await Genre.deleteMany({});
        await Genre.insertMany(genres);
    }
}
