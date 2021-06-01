import { StyleSheet } from "react-native";

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
    flexDirection: "column",
    backgroundColor: "yellow",
    //alignItems: 'center',
    //marginTop: 0,
    //padding: 0,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    backgroundColor: "#008080",
    justifyContent: "space-between",
    //alignContent: "space-between",
    alignItems: "center",
  },
  formContainer: {
    flexDirection: "row",
    height: 5,
    marginTop: 0,
    marginBottom: 0,
    flex: 1,
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  input: {
    height: 47,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    //marginLeft: 5,
    flex: 1,
    marginRight: 10,
    //width :50,
    //marginTop:10,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    marginTop: 0,
    padding: 0,
  },
  entityContainer: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    paddingBottom: 16,
    height: 50,
    //justifyContent: "center",
  },
  childContainer: {
    flex: 6,
    flexDirection: "row",
    marginTop: 10,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    paddingBottom: 16,
    height: 50,
    alignContent: "space-between",
    //justifyContent: "center",
  },
  entityText: {
    fontSize: 20,
    color: "#333333",
  },
  button_delete: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#FF4500",
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginHorizontal: 50,
    //paddingTop: 30,
  },
  buttondel: {
    height: 30,
    borderRadius: 5,
    backgroundColor: "#20B2AA",
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    //paddingTop: 30,
  },
  tasks: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 25,
    height: 25,
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    flexBasis: "66%",
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    borderLeftWidth: 6,
    borderRadius: 5,
  },

  description: {
    fontSize: 14,
    flex: 1,
    color: "#008080",
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    flex: 1,
    color: "#696969",
    marginTop: 5,
  },
  content: {
    fontSize: 14,
    color: "#696969",
    marginTop: 5,
  },
});
