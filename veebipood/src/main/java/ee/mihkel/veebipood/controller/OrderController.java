package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.dto.OrderRowDto;
import ee.mihkel.veebipood.entity.Order;
import ee.mihkel.veebipood.entity.OrderRow;
import ee.mihkel.veebipood.repository.OrderRepository;
import ee.mihkel.veebipood.service.OrderService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class OrderController {

    private OrderRepository orderRepository;
    private OrderService orderService;


    @GetMapping("orders")
    public List<Order> getOrders(){
        return orderRepository.findAll();
    }

    @DeleteMapping("orders/{id}")
    public List<Order> deleteOrder(@PathVariable Long id){
        orderRepository.deleteById(id); // kustutan
        return orderRepository.findAll(); // uuenenud seis
    }

    // person --> autentimise tokenist. parcelmachine --> Omnivast
    // localhost:8080/orders?personId=1
    @PostMapping("orders")
    public Order addOrder(@RequestParam Long personId,
                                @RequestParam(required = false) String parcelMachine,
                                @RequestBody List<OrderRowDto> orderRows){
        return orderService.saveOrder(personId, parcelMachine, orderRows); // siin salvestab
        //return orderRepository.findAll(); // siin on uuenenud seis
    }
}
