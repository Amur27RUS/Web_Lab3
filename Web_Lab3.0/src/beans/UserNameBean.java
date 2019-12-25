package beans;

public class UserNameBean {

    private String name;

    /*-----GETTERS-----*/
    public String getName() {
        return name;
    }

    /*-----SETTERS-----*/
    public void setName(String name) {
        this.name = name;
    }

    /*-----METHODS-----*/
    public void clear(){
        this.setName(null);
    }

}
