package ee.robert.veebipood.service;

import ee.robert.veebipood.dto.OrderRowDto;
import ee.robert.veebipood.entity.Order;
import ee.robert.veebipood.entity.OrderRow;
import ee.robert.veebipood.entity.Person;
import ee.robert.veebipood.entity.Product;
import ee.robert.veebipood.repository.OrderRepository;
import ee.robert.veebipood.repository.PersonRepository;
import ee.robert.veebipood.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderService {

    // @Autowired --> Dependency Injection
    // @RequiredArgConstructor --> Dependency Injection

    // tagataustal tõmmatakse sisse tema mälukohaga

    private OrderRepository orderRepository;
    private PersonRepository personRepository;
    private ProductRepository productRepository;

    public Order saveOrder(Long personId, String parcelMachine, List<OrderRowDto> orderRows) {
        Order order = new Order();
        order.setCreated(new Date()); // import ka
        order.setParcelMachine(parcelMachine);
//        order.setOrderRows(orderRows);
        Person person = personRepository.findById(personId).orElseThrow(); // kui isikut ei leia --> exception
        order.setPerson(person);
        order.setTotal(calculateOrderTotal(orderRows, order));
        return orderRepository.save(order);
    }

    private double calculateOrderTotal(List<OrderRowDto> orderRows, Order order) {
        double total = 0;
        List<OrderRow> orderRowsInOrder = new ArrayList<>();
        for (OrderRowDto orderRowDto : orderRows) {
            Product product = productRepository.findById(orderRowDto.productId()).orElseThrow();
            total += product.getPrice() * orderRowDto.quantity();

            OrderRow orderRowInOrder = new OrderRow();
            orderRowInOrder.setProduct(product);
            orderRowInOrder.setQuantity(orderRowDto.quantity());
            orderRowsInOrder.add(orderRowInOrder);
        }
        order.setOrderRows(orderRowsInOrder);
        return total;
    }
}
