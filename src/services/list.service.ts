import { Repository } from "typeorm";
import { AppDataSource } from "../../configs/database/data-source";
import { Show, User } from "../entities";
import { BadRequestException } from "../exceptions/bad-request.exception";

export class ListService {
  userRepository: Repository<User>;
  showRepository: Repository<Show>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.showRepository = AppDataSource.getRepository(Show);
  }

  private isMovieInList(showId: number, user: User) {
    return user.list.filter((show) => show.id === showId).length > 0;
  }

  async add(user: User, showId: number) {
    if (this.isMovieInList(showId, user)) {
      throw new BadRequestException("Filme já adicionado");
    }

    const show = await this.showRepository.findOneByOrFail({ id: showId });
    user.list = [...user.list, show];

    return this.userRepository.save(user);
  }

  remove(showId: number, user: User) {
    const newUserList = user.list.filter((show) => show.id !== showId);

    return this.userRepository.save({
      ...user,
      list: newUserList,
    });
  }
}
