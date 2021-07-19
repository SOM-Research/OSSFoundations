export const selectedFoundation = {
    data() {
        return {
            selectedFoundation: {
                idLinkedFoundation: "", //In case of foundations of status "edition"
                id: "",
                name: "",
                url: "",
                dissolved: "",
                rq1Inter: "",
                rq1Indep: "",
                rq1Open: "",
                SD: "",
                rq3rq4: "",
                legal: "",
                topics: [
                    // {
                    //     name: "Event-organization",
                    //     checked: false
                    // },
                    // {
                    //     name: "Training",
                    //     checked: false
                    // },
                    // {
                    //     name: "Legal-support",
                    //     checked: false
                    // },
                    // {
                    //     name: "Community-coordination",
                    //     checked: false
                    // },
                    // {
                    //     name: "Project-sponsoring",
                    //     checked: false
                    // },
                    // {
                    //     name: "Software-Development",
                    //     checked: false
                    // },
                    // {
                    //     name: "OSS-promotion",
                    //     checked: false
                    // },
                    // {
                    //     name: "Government-involvement",
                    //     checked: false
                    // },
                    // {
                    //     name: "Standard-leaders",
                    //     checked: false
                    // }
                ],
                topicsString: "",
                authorName: "",
                authorMail: "",
                status: "",
                creationDate: "",
            },
        }
    },
    methods: {
        //Sends the data from the new-edit-foundation component this component
        updateSelectedFoundation(f) {
            this.selectedFoundation = f;
        },
        //Converts the checked topics to a string value when submit
        topicsToString() {
            this.selectedFoundation.topicsString = "";
            for (var i = 0; i < this.selectedFoundation.topics.length; i++) {
                if (this.selectedFoundation.topics[i].checked) {
                    this.selectedFoundation.topicsString += this.selectedFoundation.topics[i].name;
                    this.selectedFoundation.topicsString += ",";
                }
            }
            //Replace the last comma and if it has any white space after it
            this.selectedFoundation.topicsString = this.selectedFoundation.topicsString.replace(
                /,\s*$/,
                ""
            );
        },
        //Fills the form with the info of the selected foundation by using its ID
        loadFormData(id, foundationsList) {
            for (var x in foundationsList) {
                if (foundationsList[x].id == id) {
                    (foundationsList[x].idLinkedFoundation != undefined) ? this.selectedFoundation.idLinkedFoundation =
                        foundationsList[x].idLinkedFoundation : this.selectedFoundation.idLinkedFoundation = "";
                    this.selectedFoundation.name = foundationsList[x].name;
                    this.selectedFoundation.id = foundationsList[x].id;
                    this.selectedFoundation.url = foundationsList[x].url;
                    this.selectedFoundation.dissolved = foundationsList[x].dissolved;
                    this.selectedFoundation.rq1Inter = foundationsList[x].rq1Inter;
                    this.selectedFoundation.rq1Indep = foundationsList[x].rq1Indep;
                    this.selectedFoundation.rq1Open = foundationsList[x].rq1Open;
                    this.selectedFoundation.SD = foundationsList[x].SD;
                    (foundationsList[x].author != undefined) ? this.selectedFoundation.authorMail = foundationsList[x].author.mail : this.selectedFoundation.authorMail = "";
                    (foundationsList[x].author != undefined) ? this.selectedFoundation.authorName = foundationsList[x].author.name : this.selectedFoundation.authorName = "";
                    this.selectedFoundation.SD == "Y" ? this.topicSD = true : this.topicSD = false
                    this.selectedFoundation.rq3rq4 = foundationsList[x].rq3rq4;
                    this.selectedFoundation.legal = foundationsList[x].legal;
                    //Loads the selected topics
                    for (var i = 0; i < this.selectedFoundation.topics.length; i++) {
                        if (
                            foundationsList[x].topics.includes(this.selectedFoundation.topics[i].name)
                        ) {
                            this.selectedFoundation.topics[i].checked = true;
                        } else {
                            this.selectedFoundation.topics[i].checked = false;
                        }
                    }
                }
            }
        },
    }
}