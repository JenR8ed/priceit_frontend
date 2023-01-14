<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#About PriceIt | Frontend">About PriceIt | Frontend</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About PriceIt | Frontend
This Repo contains the Frontend of our BA project - PriceIt.

Please refer to [PriceIt Search API](https://github.com/aaronalayo/priceit-backend) for general information about the project.

### Built With

This project is built with the following tools


* [![React][React.js]][React-url]
* [![MaterialUI][MaterialUI]][Material-url]
* [![Vite][ViteLogo]][Vite-url]


<p align="right">[<a href="#readme-top">back to top</a>]</p>


## Getting Started
Use the guide below to run the application locally. Remember to also setup the AUTH and SEARCH services in order for the application to function properly.
### Prerequisites

Following criterias are needed:
- Docker installed
* [![PriceIt-auth][PriceIt-auth-logo]][PriceIt-auth-url]
* [![PriceIt-search][PriceIt-search-logo]][PriceIt-search-url]

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/aaronalayo/priceit_frontend.git
   ``` 
2. Create a '.env' in the root dir of the project
    ```variables
    LOCAL_SERVER_PORT=
    DOCKER_SERVER_PORT=
    VITE_SEARCH_BASE_URL=
    VITE_AUTH_BASE_URL=
    NODE_ENV=
    ```
 
3. Spin up the container
   ```sh
   $ docker-compose up -d
   ```
4. Access the site
   ```
    http://localhost:<DOCKER_SERVER_PORT>
   ```

<p align="right">[<a href="#readme-top">back to top</a>]</p>


## Project Services / Repositories

Project Links: 
* [![PriceIt-auth][PriceIt-auth-logo]][PriceIt-auth-url]
* [![PriceIt-search][PriceIt-search-logo]][PriceIt-search-url]

<p align="right">[<a href="#readme-top">back to top</a>]</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">[<a href="#readme-top">back to top</a>]</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[MaterialUI]: https://img.shields.io/badge/MaterialUi-UI%20Components-blue
[Material-url]: https://mui.com/material-ui/
[ViteLogo]: https://img.shields.io/badge/Vite-Frontend%20Tooling-green
[Vite-url]: https://vitejs.dev/

[PriceIt-auth-logo]: https://img.shields.io/badge/PriceIt-Auth%20API-green
[PriceIt-auth-url]: https://github.com/aaronalayo/priceit_auth
[PriceIt-search-logo]: https://img.shields.io/badge/PriceIt-Search%20API-orange
[PriceIt-search-url]: https://github.com/aaronalayo/priceit-backend
[PriceIt-frontend-logo]: httzs://img.shields.io/badge/PriceIt-Frontend-blue
[PriceIt-frontend-url]: https://github.com/aaronalayo/priceit_frontend