## Clairvoyance Dashboard

This webapp started as a project as a simple task manager but evolved to be a springboard for any ideas I wanted to have. The idea was that I would be better able to "see" my life and what I need to do. 

### Technologies Used
- FastAPI in python
- MongoDB
- NextJS
- React
- Tailwindcss
- Docker
- Express JS
- Typescript


### Features
Some parts are incomplete and aren't being used completely as the scope is quite large for some of the features.

- Week calander
- Todo list
- Project Management system WIP
- Information/News aggregation with an autosuggest search
    - This system scrapes articles from Hackernews, NYTimes, or any other RSS feed and inserts into a MongoDB Database. I built a suggest dropdown search bar that can be used to find specific articles.
    - I haven't completely integrated all features but I have also built both a News Categorization Model in Pytorch on the AG News dataset and a keyword extraction script to automatically tag the articles
- Simple word processing system which saves the notes as markdown files via a NodeJS Express server