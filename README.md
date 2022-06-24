## Access Token + Refresh Token implementation in Node.js with Nestjs

If you don't familiar with **RefreshToken**, and you don't know why we should use it, the below  links can be helpful:

- https://developer.okta.com/docs/guides/refresh-tokens/main/ 
- https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/ 
- https://auth0.com/learn/refresh-tokens/


### Project setup
1. Make and configure  **.env** file in the root folder of the project:

```.env
# .env

PORT = SERVICE_PORT 
DATABASE_URL = YOUR_POSTGRE_DATABASE_URI_CONNECTION 

# SecretKey must have at least 32 characters and contains uppercase characters, lowercase characters, and digits.
JWT_ACCESS_TOKEN_SECRET_KEY = YOUR_SECRET_KEY
JWT_REFRESH_TOKEN_SECRET_KEY = YOUR_SECRET_KEY 

# Tokens LifeTime
ACCESS_TOKEN_LIFE_TIME = 15 #Minutes
REFRESH_TOKEN_LIFE_TIME = 7 #Days

# Rate Limiting
RATE_LIMIT_TIME_TO_LIVE = 10 #Seconds
RATE_LIMIT_MAX_NUMBER_REQUEST = 2

# CORS
CORS_ORIGIN = http://test.com

# Zone
TIME_ZONE = Asia/Tehran
```

2. Generate Prisma Client:
```text
npx prisma generate
```

3. Push the Prisma schema state to the database:
```text
npx prisma db push
```

4. Run the application:
```text
npm run start
```

### Routes
|  Route |  Method  |  Description |
| ------------ | ------------ |------------ |
| /api/v1/auth/signup  | Post |Signup |
|  /api/v1/auth/signin | Post  |Signin  |
| /api/v1/auth/refresh  | Post  |Refresh  |
|  /api/v1/auth/logout | Post  | Logout  |

#### Signup route parameters:
|  Parameter |  Description |MinLength |MaxLength |
| ------------ | ------------ |------------ |------------ |
| username   | username can only contain lowercase characters, digits, and underscores  | 5 | 10 |
|  password | password must contain at least one uppercase character, a lowercase character, a digit, and a special character  |   8    |15 |

#### Signin route parameters:
|  Parameter |  MinLength |MaxLength |
| ------------ | ------------ |------------ |
| username   | 4 | 20 |
|  password   |   4    |20 |

#### Refresh route parameters:
|  Parameter |  Value Format |
| ------------ | ------------ |
| Authorization   | Bearer [RefreshToken] |

#### Logout route parameters:
|  Parameter |  Value Format |
| ------------ | ------------ |
| Authorization   | Bearer [AccessToken] |

## 

### Postman Collection
You can find it **(*.postman_collection.json)** in the root folder of the project. 

## 

<div align="center">
  <a>
    <img src="https://github.com/SP-XD/SP-XD/blob/main/images/dino_rounded.gif?raw=true" width="700"/>
  </a>
</div>


