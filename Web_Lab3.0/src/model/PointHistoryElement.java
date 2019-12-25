package model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name= "point_history")
public class PointHistoryElement {
    @Id
    @Column(name = "id", nullable = false)
    private long id;
    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "point_id", nullable = false)
    private Point point;
    @Column(name = "x", nullable = false)
    private Double x;
    @Column(name = "y", nullable = false)
    private Double y;
    @Column(name = "ch", nullable = false)
    private String isCheck;

    public PointHistoryElement(){}

    public PointHistoryElement(Point point, double x, double y){
        this.point = point;
        this.x = x;
        this.y = y;
        double r = point.getR();
        this.isCheck = (((x <= 0 && y >= 0 && x >= -r && y <= r / 2) ||
                (x >= 0 && y <= 0 && x * x + y * y <= r / 2 * r / 2) ||
                (x >= 0 && y >= 0 && y <= (r - x * 2)))) ? "Yes" : "No";

        this.id = new Date().getTime();
    }

    public long getId() {
        return id;
    }

    public Double getX() {
        return x;
    }

    public Double getY() {
        return y;
    }

    public String getIsCheck() {
        return isCheck;
    }
}

