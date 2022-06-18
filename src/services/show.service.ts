import { Repository } from "typeorm";
import { AppDataSource } from "../../configs/database/data-source";
import { Show } from "../entities";
import NotFoundException from "../exceptions/not-found-exception.exception";
import IntegrityException from "../exceptions/integrity.exception";

export class ShowService {
  private showRepository: Repository<Show>;
  constructor() {
    this.showRepository = AppDataSource.getRepository(Show);
  }

  /**
   * Returns all shows
   * @returns Array of Shows
   */
  getAll(): Promise<Show[]> {
    return this.showRepository.find();
  }

  /**
   * Returns a show by id
   * @param id Show id
   * @returns Show
   * @throws ShowNotFoundError
   * 
   * @example
   * const show = await new ShowService().listOne(1);
   * console.log(show);
   * // { id: 1, title: "Show 1", ... }
   */

  async listOne(id: number): Promise<Show | null> {
    const showFounded = await this.showRepository.findOne({ where: { id } });

    if (!showFounded) {
      throw new NotFoundException(`Show with id ${id} not found`);
    }

    return showFounded;
  }

  /**
   * Creates a new show.
   * @param show
   * @returns Returns the created show.
   */
  async create(show: Show): Promise<Show> {
    if (await this.showRepository.findOne({ where: { title: show.title } })) {
      throw new IntegrityException("Movie already exists");
    }

    return this.showRepository.save(show);
  }

  /**
   * Deletes a show by id.
   * @param id Show id
   * @returns Returns the deleted show.
   * @throws ShowNotFoundError
   * 
   * @example
   * const show = await new ShowService().delete(1);
   * console.log(show);
   * // { id: 1, title: "Show 1", ... }
    */
  async delete(id: number): Promise<Show | null> {
    const showFounded = await this.showRepository.findOne({ where: { id } });

    if (!showFounded) {
      throw new NotFoundException(`Show with id ${id} not found`);
    }
    
    return this.showRepository.remove(showFounded);
  }
}
