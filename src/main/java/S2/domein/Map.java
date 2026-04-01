package S2.domein;

import java.util.Arrays;

public class Map {
    private String mapName;
    private Location[][] matrix;

    public Map(String mapName, Location[][] matrix){
        this.mapName = mapName;
        this.matrix = matrix;
    }

    public Location getLocation(int x, int y){
            return matrix[y][x];
    }

    public Location[][] getMatrix() {
        return matrix;
    }

    public void setMatrix(Location[][] matrix) {
        this.matrix = matrix;
    }

    public int[][] calculateDeelMatrix(int x, int y){
        int y_length = matrix.length;
        int x_length = matrix[0].length;
        int[][] result = null;
        if ((y > 0 && y < y_length - 1) && (x > 0 && x < x_length - 1)) {
            result = new int[3][3];
            int jdx = 0;
            for (int j = y - 1; j <= y + 1; j++) {
                int[] row = new int[3];
                int idx = 0;
                for (int i = x - 1; i <= x + 1; i++)
                    row[idx++] = matrix[j][i] == null ? 0 : 1;
                result[jdx++] = row;
            }
        }
        return result;
    }

    public String toString() {
        return Arrays.deepToString(matrix);
    }
}
