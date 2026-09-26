# Student Management System - Docker Microservices

A containerized Student Management System built using a microservices architecture.

## Architecture

```text
                    Frontend
                    Nginx
                   Port 8081
                       |
              +--------+--------+
              |                 |
              v                 v
        Auth Service      Student Service
          Port 3001          Port 3002
                                |
                                v
                           PostgreSQL
                            Port 5432