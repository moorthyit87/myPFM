import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerScroll: {
    flex: 1,
    paddingTop: 0,
  },
  scrollView: {
    //backgroundColor: 'pink',
    marginHorizontal: 10,
  },
    container: {
        flex: 1,
        flexDirection: 'column',
         backgroundColor: "yellow"
        //alignItems: 'center',
        //marginTop: 0,
        //padding: 0,
    },
    formContainer: {
        flexDirection: 'row',
        height: 5,
        marginTop: 0,
        marginBottom: 0,
        flex: 1,
        paddingTop: 0,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "green"
    },
    input: {
        height: 47,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        //marginLeft: 5,
        flex: 1,
        marginRight: 10,
        //width :50,
        //marginTop:10,
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 60,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        flex:1,
        marginTop: 0,
        padding: 0,
    },
    entityContainer: {
        marginTop: 0,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    }
})
