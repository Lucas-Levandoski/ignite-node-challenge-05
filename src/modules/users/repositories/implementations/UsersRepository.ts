import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await (await this.repository.findOneOrFail({ where: { id: user_id } }));

    console.log(user.games);

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query('SELECT * FROM users ORDER BY first_name ASC');
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const firstName = first_name[0].toUpperCase() + first_name.slice(1).toLowerCase();
    const lastName = last_name[0].toUpperCase() + last_name.slice(1).toLowerCase();

    return this.repository.query(`SELECT * FROM users WHERE first_name LIKE '${firstName}' AND last_name LIKE '${lastName}' `);
  }
}
