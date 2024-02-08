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
    return this.productRepository.find({where:{deleted:false}});
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

  async remove(id: number): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.productRepository.update(id, { deleted: true });
      if (result.affected === 0) {
        return { success: false, message: "El producto no se encontró." };
      }
      return { success: true, message: "El producto se eliminó correctamente." };
    } catch (error) {
      return { success: false, message: "Ocurrió un problema al intentar eliminar el producto." };
    }
  }
}
