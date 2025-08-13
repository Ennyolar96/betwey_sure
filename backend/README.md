<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Football Predictions API (NestJS)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ennyolar1996/betwey_sure.git
   cd betwey_sure
   cd backend
   ```

## Install dependencies:

```bash
$ npm install
```

## Create .env file:

```bash
  X_RAPID_API_KEY=your_api_key
  X_RAPID_API_HOST=betminer.p.rapidapi.com
  MONGO_URI=mongodb://localhost:27017/betweysure
```

## Run the app:

```bash
  $ npm run start:dev
```

## Example request:

```bash
  $ curl "http://localhost:5000/predictions?date=2025-08-11"
```

## Stay in touch

- Author - [Olaniyan Mutiu](olaniyanmutiu96@gmail.com)

## License

Nest is [MIT licensed](LICENSE).
