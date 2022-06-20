import { Repository, SimpleConsoleLogger } from "typeorm";
import { AppDataSource } from "../../configs/database/data-source";
import { Episode, Show } from "../entities";
import IntegrityException from "../exceptions/integrity.exception";
import NotFoundException from "../exceptions/not-found-exception.exception";

type CreateEpisodeDTO = Omit<Episode, "id"> & { showId: number };

export class EpisodeService {
    private episodeRepository: Repository<Episode>;
    private showRepository: Repository<Show>;

    constructor() { 
        this.episodeRepository = AppDataSource.getRepository(Episode);
        this.showRepository = AppDataSource.getRepository(Show);
    }

    async create(episode: CreateEpisodeDTO): Promise<Episode> {
        const { showId } = episode;

        const show = await this.showRepository.findOne({ where: { id: showId } });

        if (!show) {
            throw new NotFoundException("Show not found");
        }

        if (await this.episodeRepository.findOne({ where: { title: episode.title } })) {
            throw new IntegrityException("Episode already exists");
        }

        const newEpisode = await this.episodeRepository.save(episode);

        show.episodes = [...show.episodes, newEpisode];

        await this.showRepository.save(show);

        return newEpisode;
    }

    async delete(id: number): Promise<Episode | null> {
        const episode = await this.episodeRepository.findOne({ where: { id } });

        if (!episode) {
            throw new NotFoundException("Episode not found");
        }

        return this.episodeRepository.remove(episode);
    }
}