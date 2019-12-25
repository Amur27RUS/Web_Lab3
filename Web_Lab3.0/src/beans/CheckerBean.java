package beans;

import model.Point;
import model.PointHistoryElement;
import org.primefaces.event.SlideEndEvent;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;

@ManagedBean
@SessionScoped
public class CheckerBean implements Serializable {

    private Double x;
    private Double y;
    private Double r;
    private Double xCanvas;
    private Double yCanvas;
    private String resizeResult;

    private DataBean bean;
    private UserNameBean userNameBean;

    /*---------GETTERS-----------*/
    public Double getX(){
        return x;
    }
    public Double getY(){
        return y;
    }
    public Double getR(){
        return r;
    }
    public Double getxCanvas() {
        return xCanvas;
    }
    public Double getyCanvas() {
        return yCanvas;
    }
    public String getResizeResult() {
        return resizeResult;
    }
    public UserNameBean getUserNameBean() {
        return userNameBean;
    }

    /*---------SETTERS-----------*/
    public void setX(Double x){
        this.x = x;
    }
    public void setY(Double y){
        this.y = y;
    }
    public void setR(Double r){
        this.r = r;
    }
    public void setxCanvas(Double xCanvas) {
        this.xCanvas = xCanvas;
    }
    public void setyCanvas(Double yCanvas) {
        this.yCanvas = yCanvas;
    }
    public void setResizeResult(String resizeResult) {
        this.resizeResult = resizeResult;
    }
    public void setBean(DataBean bean){
        this.bean=bean;
    }
    public void setUserNameBean(UserNameBean userNameBean) {
        this.userNameBean = userNameBean;
    }

    /*---------METHODS-----------*/
    public void handleSlider(SlideEndEvent event){
        setX((double)event.getValue());
    }

    public void check() {
        Point p = new Point(getR(), userNameBean.getName());
        PointHistoryElement element = new PointHistoryElement(p, getX(), getY());
        p.addHistoryElement(element);
        bean.addPoint(p);
        bean.addElement(element);
        resizeResult = p.getIsCheck();
    }

    public void canvasCheck(){
        Point p = new Point(getR(), userNameBean.getName());
        PointHistoryElement element = new PointHistoryElement(p, xCanvas, yCanvas);
        p.addHistoryElement(element);
        bean.addPoint(p);
        bean.addElement(element);
        resizeResult = p.getIsCheck();
    }

}