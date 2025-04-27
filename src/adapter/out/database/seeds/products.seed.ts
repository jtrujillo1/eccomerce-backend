import 'dotenv/config';
import { ProductEntity } from '../entities';
import { AppDataSource } from './data-source';

export async function seed() {
  try {
    const productRepo = AppDataSource.getRepository(ProductEntity);

    await productRepo.query('TRUNCATE TABLE "order_items", "products" CASCADE');

    const products: ProductEntity[] = [
      {
        id: '1c5f7b76-4b00-4cf6-8c50-1f0000000001',
        name: 'Auriculares Bluetooth',
        description: 'Auriculares inalámbricos con cancelación de ruido.',
        stock: 25,
        urlImg:
          'https://www.steren.com.co/media/catalog/product/cache/bb0cad18a6adb5d17b0efd58f4201a2f/image/21867108a/audifonos-bluetooth-con-cancelacion-de-ruido-negros.jpg',
        amountInCents: 2999,
        orderItem: [],
      },
      {
        id: '1c5f7b76-4b00-4cf6-8c50-1f0000000002',
        name: 'Teclado Mecánico',
        description: 'Teclado retroiluminado con switches rojos.',
        stock: 10,
        urlImg:
          'https://virtualmuebles.com/cdn/shop/files/71T1WQSxp9L._AC_SL1500.jpg?v=1740163708&width=1946',
        amountInCents: 4999,
        orderItem: [],
      },
      {
        id: '1c5f7b76-4b00-4cf6-8c50-1f0000000003',
        name: 'Mouse',
        description: 'Mouse retroiluminado con switches rojos.',
        stock: 10,
        urlImg:
          'https://pcgamermedellin.com/wp-content/uploads/2023/11/mouse-gamer-t-dagger-imperial-1-1.jpg',
        amountInCents: 4999,
        orderItem: [],
      },
      {
        id: '1c5f7b76-4b00-4cf6-8c50-1f0000000004',
        name: 'Monitor',
        description: 'Monitor retroiluminado con switches rojos.',
        stock: 10,
        urlImg:
          'https://thermaltake-de-bhgycxg9djfgcmfn.a02.azurefd.net/media/catalog/product/cache/5c6d00a0ea315efe12bf2a0a73047152/g/m/gm-gce-32ceqb-us_01.jpg',
        amountInCents: 4999,
        orderItem: [],
      },
      {
        id: '1c5f7b76-4b00-4cf6-8c50-1f0000000005',
        name: 'Disco Mecánico',
        description: 'Disco mecánico',
        stock: 10,
        urlImg:
          'https://cdnx.jumpseller.com/impretoner-rc/image/45698477/resize/610/610?1708459184',
        amountInCents: 4999,
        orderItem: [],
      },
    ];

    await productRepo.save(products);

    console.log('Productos precargados exitosamente');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al hacer seed:', err);
    process.exit(1);
  }
}

void seed();
