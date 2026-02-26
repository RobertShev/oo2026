package ee.robert.veebipood.repository;

import ee.robert.veebipood.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
