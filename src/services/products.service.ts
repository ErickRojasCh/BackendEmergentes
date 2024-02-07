import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "src/entities/product.entity"; 

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product | undefined> {
    return this.productRepository.findOne({where:{id:id}});
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const newProduct = this.productRepository.create(productData);
    return this.productRepository.save(newProduct);
  }

  async update(id: number, productData: Partial<Product>): Promise<Product | undefined> {
    await this.productRepository.update(id, productData);
    return this.productRepository.findOne({where:{id:id}});
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
