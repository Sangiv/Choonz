package com.qa.Todo.presistence.repo;

import com.qa.Todo.presistence.domain.Users;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepo extends JpaRepository<Users, Long> {
}
