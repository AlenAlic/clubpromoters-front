# clubpromoters-front
Set up the live version, and a test version of the clubpromoters-front.



## Installation (Ubuntu 18.04 LTS)


### Installer instance
We'll use an instance of clubpromoters-front to install the cluster.

    git clone https://github.com/AlenAlic/clubpromoters-front
    cd clubpromoters-front
    
From here you can run any of the installations located in the scripts folder.



### Variables
Before installing anything, set the following environment variables:

    export DOMAIN=clubpromoters.net



### Installation scripts

#### LIVE
Before installing the LIVE version, set the following environment variables:

    export LIVE_FOLDER=LIVE
Then run the installation script:

    source scripts/install_LIVE
 
#### TEST
Before installing the TEST version, set the following environment variables:

    export TEST_FOLDER=TEST
Then run the installation script:

    source scripts/install_TEST
