


<h1 align="center"> Disease Tracking App 
</h1>



## Links
* Full documentation: [Confluence](https://unswseng.atlassian.net/wiki/spaces/SE3Y22G14/overview)
* Agile Scrum: [Jira](https://unswseng.atlassian.net/jira/your-work)
* Code Base: [Github](https://github.com/samztz/SENG3011_GeeksForHDs)

## Group Members

- Tingzhuang Zhou
- Avijit Prasad
- Mashira Farid
- Lin Thit
- Zifan Wei

## Description

Disease tracking App that lets user keep track of different diseases in user friendly manner. Project specification mentioned in confluence.

## Details

### Scrapper

**Puppeteer JS** is used to scrape the website. Allows us to use the Dev Tools and as the library is in JS can be easily integrated with the App

### RestAPI

Documentation through **Swagger**

### Backend

**MongoDB** used as most of our requirements are solved by non-SQL based data

### Frontend

**React** is used as the component based frontend serves to fulfill our requirements

### Deployment

**Heroku** is used to deploy our API endpoints

## Getting Started

### Clone and run the API

```console
git clone https://github.com/samztz/SENG3011_GeeksForHDs.git
cd SENG3011_GeeksForHDs
npm init
npm start
```

### Requirements

- NodeJS
- Puppeteer JS
- Material UI
- MongoCB libraries
- React
- RestAPI

## Accessing API

### For Dev
```console
GET/report/:country/:city/?start=''&end=
```
Input country and city with start and end time (DD:MM:YYYY) to receive data

```console
GET/report/?{reportId} 
```
To get specific reports

```console
Get/report/all
```
To get all reports

### User Users

```console
GET/report/:userId/
```
Get user reports by user id
```console
POST/report/:userId/:reportId
```
Save reports to user return successful report

- DELETE/api/report/:userId/ (delete report)
- GET/report/:country/:city/?start=''&end=
