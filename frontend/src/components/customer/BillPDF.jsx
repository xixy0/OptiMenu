import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
    color: "#333",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
    textAlign: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 5,
  },
  restaurantInfo: {
    fontSize: 10,
    color: "#555",
    marginBottom: 2,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
    marginVertical: 10,
  },
  billTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#333",
    marginTop: 10,
    marginBottom: 15,
  },
  billInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableColItem: {
    width: "55%",
    padding: 6,
  },
  tableColQty: {
    width: "15%",
    padding: 6,
    textAlign: "center",
  },
  tableColPrice: {
    width: "30%",
    padding: 6,
    textAlign: "right",
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  totalLabel: {
    width: "30%",
    textAlign: "right",
    paddingRight: 10,
    fontWeight: "bold",
  },
  totalValue: {
    width: "20%",
    textAlign: "right",
  },
  grandTotal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 10,
    color: "#777",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 10,
  },
});

const BillPDF = ({ bill, subtotal, tax, total }) => (
  <Document>
    <Page
      size="A4"
      style={styles.page}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          src="https://your-restaurant-logo-url.com/logo.png"
        />
        <Text style={styles.restaurantName}>Your Restaurant Name</Text>
        <View style={styles.divider} />
        <Text style={styles.restaurantInfo}>
          123 Restaurant Street, Foodville
        </Text>
        <Text style={styles.restaurantInfo}>Phone: (123) 456-7890</Text>
        <Text style={styles.restaurantInfo}>
          Email: info@yourrestaurant.com
        </Text>
      </View>

      <Text style={styles.billTitle}>Bill Receipt</Text>

      <View style={styles.billInfo}>
        <Text>Table: {bill.tableNumber}</Text>
        <Text>Bill #: {bill.id}</Text>
        <Text>Date: {new Date(bill.createdAt).toLocaleDateString()}</Text>
        <Text>Time: {new Date(bill.createdAt).toLocaleTimeString()}</Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableColItem}>Item</Text>
          <Text style={styles.tableColQty}>Qty</Text>
          <Text style={styles.tableColPrice}>Price</Text>
        </View>
        {bill.items.map((item) => {
          return (
            <View
              style={styles.tableRow}
              key={item.id}
            >
              <Text style={styles.tableColItem}>{item.name}</Text>
              <Text style={styles.tableColQty}>{item.quantity}</Text>
              <Text style={styles.tableColPrice}>
                ${(item.Price * item.quantity).toFixed(2)}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.totalsRow}>
        <Text style={styles.totalLabel}>Subtotal:</Text>
        <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.totalsRow}>
        <Text style={styles.totalLabel}>Tax (10%):</Text>
        <Text style={styles.totalValue}>${tax.toFixed(2)}</Text>
      </View>
      <View style={[styles.totalsRow, styles.grandTotal]}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      <View style={styles.footer}>
        <Text>Thank you for dining with us!</Text>
        <Text>We hope to see you again soon.</Text>
      </View>
    </Page>
  </Document>
);

export default BillPDF;
