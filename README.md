# What is Crusader?

Crusader is a Warhammer 40K Crusade tracker.<br/>
It's still very much a work in progress and consists of an Express API and a React PWA.

## Getting Started

This project uses Yarn workspaces. 
You need to install yarn first if you do not have it.

```
npm install -g yarn
```

## Installing Dependencies

```
yarn
```


## Database
### Using Docker
```
docker-compose up -d
docker exec -i crusader_db_1 /bin/bash -c "PGPASSWORD=postgres psql -U postgres crusader -a" < ./crusader-api/src/sql/init.sql
```

### Using local Postgres instance

```
psql -U postgres
CREATE DATABASE crusader;
\q
```

```
psql -U postgres -d crusader -a -f ./crusader-api/src/sql/init.sql
```

## Development

```
yarn run start
```

## Building for Production

```
yarn run build
```


# Contributors

- <strong>Owner/Maintainer</strong> - [fjlaubscher](https://github.com/fjlaubscher)

# Contributing

Please read [CONTRIBUTING](CONTRIBUTING.md) for details on the code of conduct, and the process for submitting pull requests.

# License

Crusader is free software, and may be redistributed under the terms specified in the [LICENSE](LICENSE.md) file.
