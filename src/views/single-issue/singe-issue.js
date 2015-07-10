var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ScrollView
    } = React;

var Api = require('../../blocks/api/api');
var ApiHelper = require('../../blocks/api/api__helper');
var CustomField = require('../../blocks/custom-field/custom-field');
let SingleIssueComments = require('./single-issue__comments');
let issueListStyles = require('../issue-list/issue-list.styles');
let styles = require('./single-issue.styles');

const defaultFooterHeight = 56;

class SingeIssueView extends React.Component {
    constructor() {
        super();
        this.state = {issue: null, footerHeight: defaultFooterHeight};
    }
    componentDidMount() {
        this.api = this.props.api;

        this.loadIssue(this.props.issueId);
    }

    loadIssue(id) {
        return this.api.getIssue(id)
            .then((issue) => ApiHelper.fillFieldHash(issue))
            .then((issue) => {
                console.log('Issue', issue);
                this.setState({issue});
            })
            .catch((res) => {
                console.error(res);
            });
    }

    getAuthorForText(issue) {
        var forText = () => {
            if (issue.fieldHash.Assignee) {
                return 'for ' + issue.fieldHash.Assignee[0].fullName;
            }
            return '    Unassigned'
        };
        return `${issue.fieldHash.reporterFullName} ${forText()}`
    }

    _popCustomFields() {
        this.setState({footerHeight: 500})
    }

    _renderHeader() {
        return (
            <View style={issueListStyles.headerContainer}>
                <TouchableHighlight
                    underlayColor="#F8F8F8"
                    style={issueListStyles.logOut}
                    onPress={() => this.props.onBack()}>
                    <Text style={issueListStyles.logOut__text}>List</Text>
                </TouchableHighlight>

                <Text style={styles.headerText}>{this.props.issueId}</Text>
            </View>
        )
    }

    _renderAttachments(attachments) {
        return (attachments || []).map((attach) => {
            //TODO: hacking https certificate error. REMOVE IT!
            let imgSrc = attach.url.replace('https://hackathon15.labs.intellij.net', 'http://hackathon15.labs.intellij.net:8080');
            return <Image
                key={attach.id}
                style={styles.attachment}
                capInsets={{left: 15, right: 15, bottom: 15, top: 15}}
                source={{uri: imgSrc}}/>;
        });
    }

    _renderIssueView(issue) {
        return (
            <View style={styles.issueViewContainer}>
                <Text style={styles.authorForText}>{this.getAuthorForText(issue)}</Text>
                <Text style={styles.summary}>{issue.fieldHash.summary}</Text>
                {issue.fieldHash.description && <Text style={styles.description}>{issue.fieldHash.description}</Text>}

                {issue.fieldHash.attachments && <ScrollView style={styles.attachesContainer} horizontal={true}>
                    {this._renderAttachments(issue.fieldHash.attachments)}
                </ScrollView>}
            </View>
        );
    }

    _renderFooter(issue) {
        let fieldsToDisplay = (issue.field || []).filter(field => field.name[0] === field.name[0].toUpperCase());

        return (<View style={[styles.footer, {height: this.state.footerHeight}]}>
            {false && <TouchableHighlight underlayColor="#F8F8F8" style={styles.iconButton} onPress={() => this._popCustomFields()}>
                <Image style={styles.footerIcon} source={require('image!arrow')}/>
            </TouchableHighlight>}

            <CustomField key="Project" field={{name: 'Project', value: issue.fieldHash.projectShortName}}/>

            {fieldsToDisplay.map((field) => {
                return (<CustomField key={field.name} field={field}/>);
            })}
        </View>);
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderHeader()}
                {this.state.issue && <ScrollView>
                    {this._renderIssueView(this.state.issue)}
                    <SingleIssueComments issue={this.state.issue}/>
                </ScrollView>}
                {this.state.issue && this._renderFooter(this.state.issue)}
            </View>
        );
    }
}

module.exports = SingeIssueView;