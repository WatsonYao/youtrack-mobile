import {StyleSheet} from 'react-native';
import {UNIT, COLOR_PINK, COLOR_FONT_GRAY} from '../../components/variables/variables';

const FONT_SIZE = 18;

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: UNIT*4,
        paddingLeft: UNIT*4,
        paddingRight: UNIT*4,
        paddingBottom: UNIT*2,
        backgroundColor: '#FFF'
    },
    welcome: {
        fontSize: 26,
        textAlign: 'center'
    },
    linkContainer: {
        padding: 10,
        alignItems: 'center'
    },
    signin: {
        padding: 10,
        borderRadius: 6,
        backgroundColor: COLOR_PINK,
        alignItems: 'center'
    },
    signinText: {
        fontSize: FONT_SIZE,
        color: '#FFF',
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    linkLike: {
        fontSize: FONT_SIZE,
        color: COLOR_PINK
    },
    input: {
        height: UNIT*4,
        marginTop: UNIT,
        marginBottom: UNIT,
        backgroundColor: '#FFF',
        color: '#7E7E84',
        fontSize: FONT_SIZE,
        borderBottomColor: COLOR_PINK,
        borderBottomWidth: 1
    },
    inputsContainer: {
        height: 120,
        alignItems: 'center'
    },
    actionsContainer: {
    },
    logoContainer: {
        alignItems: 'center'
    },
    logoImage: {
        flex: 1,
        height: UNIT*10,
        resizeMode: 'contain'
    },
    descriptionText: {
        fontSize: 12,
        color: COLOR_FONT_GRAY,
        textAlign: 'center'
    }
});