```
.
├── answer
│   ├── answer.controller.ts
│   ├── answer.module.ts
│   ├── dto
│   │   ├── create_answer.dto.ts
│   │   └── update_answer.dto.ts
│   └── provider
│       └── answer.repository.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── archive
│   ├── archive.controller.ts
│   ├── archive.module.ts
│   ├── dto
│   │   ├── create_archive.dto.ts
│   │   └── update_archive.dto.ts
│   ├── interface
│   └── provider
│       ├── archive.repository.ts
│       └── archive.service.ts
├── auth
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── dto
│   │   └── payload.dto.ts
│   ├── interface
│   │   └── jwt.interface.ts
│   └── provider
│       ├── auth.service.ts
│       └── oauth.service.ts
├── category
│   ├── category.controllet.ts
│   ├── category.module.ts
│   ├── dto
│   │   ├── create_category.dto.ts
│   │   └── update_category.dto.ts
│   ├── interface
│   └── provider
│       ├── category.repository.ts
│       └── category.service.ts
├── common
│   ├── decorator
│   │   ├── ApiResponse.ts
│   │   ├── IsULID.ts
│   │   └── current-user.decorator.ts
│   ├── exception
│   │   ├── http-api-exception.filter.ts
│   │   └── unauthorizedException.filter.ts
│   ├── guard
│   │   ├── JWT
│   │   │   ├── jtw.payload.ts
│   │   │   ├── jwt.guard.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   └── jwtExtractorFromCookeis.ts
│   │   ├── adminGuard.ts
│   │   └── devGuard.ts
│   ├── interceptor
│   │   └── success.interceptor.ts
│   ├── middleware
│   │   └── logger.middleware.ts
│   ├── options
│   │   ├── config.option.ts
│   │   ├── winston.option.ts
│   │   └── winstonDaily.option.ts
│   ├── schemes
│   │   └── config.scheme.ts
│   └── util
│       ├── res
│       │   ├── BaseResponse.ts
│       │   ├── BaseResponseIndex.ts
│       │   └── baseStatusResponse.ts
│       └── winston.util.ts
├── config
│   ├── authConfig.ts
│   └── env
├── login
│   ├── controller
│   │   ├── login.contoller.ts
│   │   ├── logout.controller.ts
│   │   └── signup.controller.ts
│   ├── dto
│   │   ├── login.dto.ts
│   │   └── signup.dto.ts
│   ├── interface
│   │   ├── login.interface.ts
│   │   ├── signup.interface.ts
│   │   └── socialType.ts
│   ├── login.module.ts
│   └── provider
│       ├── login.service.ts
│       └── signup.service.ts
├── main.ts
├── order
│   ├── dto
│   │   ├── create_order.dto.ts
│   │   ├── customer
│   │   │   └── create_customer.dto.ts
│   │   ├── order_product
│   │   │   └── create_order_product.dto.ts
│   │   ├── payment
│   │   │   └── create_payment_info.dto.ts
│   │   └── recipient
│   │       └── create_recipient_info.dto.ts
│   ├── interface
│   ├── mock
│   │   └── index.ts
│   ├── order.controller.ts
│   ├── order.module.ts
│   └── provider
│       ├── order.repository.ts
│       └── order.service.ts
├── prisma
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── product
│   ├── dto
│   │   ├── create_product.dto.ts
│   │   └── update_product.dto.ts
│   ├── interface
│   │   └── product_status.enum.ts
│   ├── product.controller.ts
│   ├── product.module.ts
│   └── provider
│       ├── product.faker.ts
│       ├── product.repository.ts
│       └── product.service.ts
├── question
│   ├── dto
│   │   ├── create_question.dto.ts
│   │   └── update_question.dto.ts
│   ├── interface
│   │   └── question_type.enum.ts
│   ├── provider
│   │   ├── question.repository.ts
│   │   └── question.service.ts
│   ├── question.controller.ts
│   └── question.module.ts
├── server.ts
└── user
    ├── controller
    │   ├── my.controller.ts
    │   └── user.controller.ts
    ├── dto
    │   ├── create_user.dto.ts
    │   └── current_user.dto.ts
    ├── interface
    │   └── create_user.interface.ts
    ├── mock
    │   └── user.mock.ts
    ├── provider
    │   ├── user.repository.ts
    │   └── user.service.ts
    └── user.module.ts
```
