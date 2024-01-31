import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.init();

    const dataSource = app.get<DataSource>(getDataSourceToken());

    // Certifique-se de que a conexão está estabelecida antes de realizar operações
    if (!dataSource.isInitialized) {
      // Estabelece a conexão somente se não estiver conectado
      await dataSource.initialize();
    }

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const productRepo = queryRunner.manager.getRepository('Product');
      const productsData = [
        {
          id: uuidv4(),
          name: 'Product 1',
          description: 'Description 1',
          price: 100,
          image_url: 'http://localhost:9000/products/1.png',
        },
        {
          id: uuidv4(),
          name: 'Product 2',
          description: 'Description 2',
          price: 150,
          image_url: 'http://localhost:9000/products/2.png',
        },
        {
          id: uuidv4(),
          name: 'Product 3',
          description: 'Description 3',
          price: 200,
          image_url: 'http://localhost:9000/products/3.png',
        },
        {
          id: uuidv4(),
          name: 'Product 4',
          description: 'Description 4',
          price: 120,
          image_url: 'http://localhost:9000/products/4.png',
        },
        {
          id: uuidv4(),
          name: 'Product 5',
          description: 'Description 5',
          price: 180,
          image_url: 'http://localhost:9000/products/5.png',
        },
        {
          id: uuidv4(),
          name: 'Product 6',
          description: 'Description 6',
          price: 250,
          image_url: 'http://localhost:9000/products/6.png',
        },
        {
          id: uuidv4(),
          name: 'Product 7',
          description: 'Description 7',
          price: 300,
          image_url: 'http://localhost:9000/products/7.png',
        },
        {
          id: uuidv4(),
          name: 'Product 8',
          description: 'Description 8',
          price: 130,
          image_url: 'http://localhost:9000/products/8.png',
        },
        {
          id: uuidv4(),
          name: 'Product 9',
          description: 'Description 9',
          price: 160,
          image_url: 'http://localhost:9000/products/9.png',
        },
        {
          id: uuidv4(),
          name: 'Product 10',
          description: 'Description 10',
          price: 220,
          image_url: 'http://localhost:9000/products/10.png',
        },
        {
          id: uuidv4(),
          name: 'Product 11',
          description: 'Description 11',
          price: 170,
          image_url: 'http://localhost:9000/products/11.png',
        },
        {
          id: uuidv4(),
          name: 'Product 12',
          description: 'Description 12',
          price: 190,
          image_url: 'http://localhost:9000/products/12.png',
        },
        {
          id: uuidv4(),
          name: 'Product 13',
          description: 'Description 13',
          price: 140,
          image_url: 'http://localhost:9000/products/13.png',
        },
        {
          id: uuidv4(),
          name: 'Product 14',
          description: 'Description 14',
          price: 260,
          image_url: 'http://localhost:9000/products/14.png',
        },
        {
          id: uuidv4(),
          name: 'Product 15',
          description: 'Description 15',
          price: 280,
          image_url: 'http://localhost:9000/products/15.png',
        },
        {
          id: uuidv4(),
          name: 'Product 16',
          description: 'Description 16',
          price: 200,
          image_url: 'http://localhost:9000/products/16.png',
        },
        {
          id: uuidv4(),
          name: 'Product 17',
          description: 'Description 17',
          price: 150,
          image_url: 'http://localhost:9000/products/17.png',
        },
        {
          id: uuidv4(),
          name: 'Product 18',
          description: 'Description 18',
          price: 170,
          image_url: 'http://localhost:9000/products/18.png',
        },
        {
          id: uuidv4(),
          name: 'Product 19',
          description: 'Description 19',
          price: 240,
          image_url: 'http://localhost:9000/products/19.png',
        },
        {
          id: uuidv4(),
          name: 'Product 20',
          description: 'Description 20',
          price: 300,
          image_url: 'http://localhost:9000/products/20.png',
        },
      ];

      await productRepo.insert(productsData);

      // Commit da transação após operações do banco de dados
      await queryRunner.commitTransaction();
    } catch (error) {
      // Rollback da transação em caso de erro
      await queryRunner.rollbackTransaction();
      console.error('Erro durante operações do banco de dados:', error);
    } finally {
      // Libera o queryRunner após as operações
      await queryRunner.release();
    }
  } catch (error) {
    console.error('Erro durante inicialização da aplicação:', error);
  }
}

bootstrap();
