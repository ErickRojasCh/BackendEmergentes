import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { ProductsService } from "src/services/products.service";
import { Product } from "src/entities/product.entity"; 
import { AuthGuard } from "src/guards/auth.guard";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Product | undefined> {
    return this.productsService.findOne(id);
  }
  @Post()
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productsService.create(productData);
  }
  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() productData: Partial<Product>
  ): Promise<Product | undefined> {
    return this.productsService.update(id, productData);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.productsService.remove(id);
      return result;
    } catch (error) {
      return { success: false, message: "Ocurrió un problema al intentar eliminar el producto." };
    }
  }
}
