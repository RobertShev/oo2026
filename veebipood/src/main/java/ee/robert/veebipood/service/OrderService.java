package ee.robert.veebipood.service;

import ee.robert.veebipood.dto.EveryPayBody;
import ee.robert.veebipood.dto.EveryPayResponse;
import ee.robert.veebipood.dto.OrderRowDto;
import ee.robert.veebipood.dto.PaymentUrl;
import ee.robert.veebipood.entity.Order;
import ee.robert.veebipood.entity.OrderRow;
import ee.robert.veebipood.entity.Person;
import ee.robert.veebipood.entity.Product;
import ee.robert.veebipood.repository.OrderRepository;
import ee.robert.veebipood.repository.PersonRepository;
import ee.robert.veebipood.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    // @Autowired --> Dependency Injection
    // @RequiredArgConstructor --> Dependency Injection

    // tagataustal tõmmatakse sisse tema mälukohaga

    private final OrderRepository orderRepository;
    private final PersonRepository personRepository;
    private final ProductRepository productRepository;
    private RestTemplate restTemplate = new RestTemplate();

    public PaymentUrl makePayment(Long orderId, double sum) {
        EveryPayBody body = new EveryPayBody();
        body.setAccount_name("EUR3D1"); // erinevad kontod.
        body.setNonce("165784a" + ZonedDateTime.now() + Math.random()); // turvaelement, et ei läheks topeltpäring
        body.setTimestamp(ZonedDateTime.now().toString()); // turvaelement. pluss miinus 5 minutit
        body.setAmount(sum); // max 7000 eurot on default
        body.setOrder_reference("mihkel" + orderId); // kui on makstud, siis teist korda maksma minna ei saa
        body.setCustomer_url("http://err.ee"); // kuhu tagasi suunatakse. localhosti ei saa
        body.setApi_username("e36eb40f5ec87fa2"); // turvaelement. Headeris olemas. aga peab ühtima sellega mis on headeris

        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth("e36eb40f5ec87fa2", "7b91a3b9e1b74524c2e9fc282f8ac8cd");
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity entity = new HttpEntity(body, headers);

        String url = "https://igw-demo.every-pay.com/api/v4/payments/oneoff";
        EveryPayResponse response = restTemplate.exchange(url, HttpMethod.POST, entity, EveryPayResponse.class).getBody();
        PaymentUrl paymentLink = new PaymentUrl();
        paymentLink.setUrl(response.getPayment_link());
        return paymentLink;
    }

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
