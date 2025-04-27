import 'dotenv/config';
import { UserEntity } from '../entities'; // ajustá si es necesario
import { AppDataSource } from './data-source';

export async function seed() {
  const userRepo = AppDataSource.getRepository(UserEntity);

  const users: UserEntity[] = [
    {
      id: '1c5f7b76-0000-0000-0000-000000000012',
      email: 'user1@example.com',
      createdAt: new Date(),
      order: [],
    },
    {
      id: '1c5f7b76-0000-0000-0000-000000000002',
      email: 'user2@example.com',
      createdAt: new Date(),
      order: [],
    },
  ];

  for (const user of users) {
    const existing = await userRepo.findOne({ where: { id: user.id } });
    if (!existing) {
      await userRepo.save(user);
      console.log(`Usuario ${user.email} creado`);
    } else {
      console.log(`Usuario ${user.email} ya existe`);
    }
  }

  console.log('Usuarios precargados exitosamente');
}

seed().catch((err) => {
  console.error('Error al hacer seed', err);
});
