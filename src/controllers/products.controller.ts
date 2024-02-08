import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { ProductsService } from "src/services/products.service";
import { Product } from "src/entities/product.entity"; 
import { AuthGuard } from "src/guards/auth.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('Productos')
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Product | undefined> {
    return this.productsService.findOne(id);
  }
  @ApiOperation({ summary: 'Crear un nuevo Producto' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'ProductoUno' },
        description: { type: 'string', example: 'Esta es la descripcion' },
        price: { type: 'number', example: 15.55 },
      
      },
    },
    description: 'Aqui se agrega un nuevo Producto',
  })
  @ApiResponse({ status: 201, description: 'El Producto fue creado' })
  @Post()
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productsService.create(productData);
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Editar Producto' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Producto ejemplo Actualizado' },
        description: { type: 'string', example: 'Esta es una descripción de ejemplo' },
        price: { type: 'number', example: 15.55 },
      },
    },
    description: 'Aqui se Actualiza la informacion de un producto',
  })
  @ApiResponse({ status: 201, description: 'Producto Actualizado' })
  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() productData: Partial<Product>
  ): Promise<Product | undefined> {
    return this.productsService.update(id, productData);
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
