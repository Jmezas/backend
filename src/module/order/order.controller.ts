import { Controller, Query, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './interface/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
//import { UpdateOrderDto } from './dto/update-order.dto';
import * as nodemailer from 'nodemailer';
import { MatchQueryPipe } from 'src/common/pipes/match-query.pipe';
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    console.log(createOrderDto)
    //envair correo
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "betsy.casper51@ethereal.email", // generated ethereal user
        pass: 'Cs4e1bYXhQUHXEbyPk', // generated ethereal password
      },
    });
    let mailOptions = {
      from: 'remitente', // sender address
      to: createOrderDto.cliente["email"], // list of receivers
      subject: "Compra Realizada", // Subject line
      text: "¡gracias por la compra!", // plain text body
      html: this.mensaje(createOrderDto.product, createOrderDto.cliente, createOrderDto.total), // html body
    }

    transporter.sendMail(mailOptions, (err, inf) => {
      if (err) {
        console.log(err)
      } else {
        console.log("enviado")
      }
    })

    const OrderDB = await this.orderService.create(createOrderDto);

    const orderId = await this.orderService.findOne(OrderDB["_id"]);


    let total = await this.orderService.countOrders({ active: true });

    const actualizar = await this.orderService.updateOrder({ _id: orderId, active: true }, { orden: total + 1 });

    return OrderDB;
  }

  private mensaje(producto: any, cliente: any, total) {
    let mensaje = "";
    mensaje = `<h3> Gracias por la compra: ${cliente.firstname} </h3>
              <br/>
              <br/>
              <hr>       
              
          

    `

    mensaje = mensaje + `<table style="font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;">
    <tr style="background-color: #dddddd;">
    <th> nombre producto </th>
     
    <th> descripcion </th>
    <th>  precio  </th>
    <th> descuento </th>
    <th> cantidad  </th>
    </tr>
    `
    for (let i = 0; i < producto.length; i++) {
      total = total + producto[i]["price"] * producto[i]["quantity"];


      mensaje = mensaje + `<tr style="background-color: #dddddd;">
                        <td style="border:1px, text-align:center;">${producto[i]["title"]}</td>
                        
                        <td style="border:1px text-align:center;">${producto[i]["description"]}</td>
                       
                        <td style="border:1px text-align:center;">${producto[i]["price"]}</td>
                       
                        <td style="border:1px text-align:center;">${producto[i]["discount"]}</td>
                         
                        <td style="border:1px text-align:center;">${producto[i]["quantity"]}</td>
                        </tr>
                        `
    }
    mensaje = mensaje + "</table>"

    mensaje = mensaje + `<br/>
                       <br/>
                        <p><storm>Total a Pagar:  ${total}</storm></p>`
    return mensaje;
  }
  @Get()
  async findAll(@Query(new MatchQueryPipe(['title'])) query): Promise<{ order: Order[], total: number }> {
    const order = await this.orderService.findAll(query);
    const total = await this.orderService.countOrders(query);
    return { order, total };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }


}
