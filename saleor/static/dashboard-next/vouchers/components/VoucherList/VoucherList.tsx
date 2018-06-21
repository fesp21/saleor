import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";

import { VoucherType } from "../..";
import Money from "../../../components/Money";
import Skeleton from "../../../components/Skeleton";
import TablePagination from "../../../components/TablePagination";
import i18n from "../../../i18n";

interface VoucherListProps {
  currency?: string;
  vouchers?: Array<{
    id: string;
    name: string;
    type: VoucherType;
    code: string;
    usageLimit: number | null;
    used: number | null;
    startDate: string | null;
    endDate: string | null;
    discountValueType: "PERCENTAGE" | "FIXED" | string;
    discountValue: number;
    product: {
      id: string;
      name: string;
      price: { amount: number; currency: string };
    } | null;
    category: {
      id: string;
      name: string;
      products: { totalCount: number };
    } | null;
    applyTo: string | null;
    limit: { amount: number; currency: string } | null;
  }>;
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  onNextPage?();
  onPreviousPage?();
  onRowClick?(id: string): () => void;
}

const decorate = withStyles(theme => ({
  link: { color: theme.palette.secondary.main, cursor: "pointer" as "pointer" },
  tableCellFont: {
    fontSize: "0.8125rem"
  },
  textRight: { textAlign: "right" as "right" }
}));
const VoucherList = decorate<VoucherListProps>(
  ({
    classes,
    currency,
    pageInfo,
    vouchers,
    onNextPage,
    onPreviousPage,
    onRowClick
  }) => (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{i18n.t("Name", { context: "object" })}</TableCell>
            <TableCell>{i18n.t("Start date", { context: "object" })}</TableCell>
            <TableCell>{i18n.t("End date", { context: "object" })}</TableCell>
            <TableCell className={classes.textRight}>
              {i18n.t("Discount", { context: "object" })}
            </TableCell>
            <TableCell className={classes.textRight}>
              {i18n.t("Limit", { context: "object" })}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={5}
              hasNextPage={pageInfo ? pageInfo.hasNextPage : undefined}
              onNextPage={onNextPage}
              hasPreviousPage={pageInfo ? pageInfo.hasPreviousPage : undefined}
              onPreviousPage={onPreviousPage}
            />
          </TableRow>
        </TableFooter>
        <TableBody>
          {vouchers === undefined || vouchers === null ? (
            <TableRow>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          ) : vouchers.length > 0 ? (
            vouchers.map(voucher => (
              <TableRow key={voucher.id}>
                <TableCell>
                  <span
                    onClick={onRowClick ? onRowClick(voucher.id) : undefined}
                    className={onRowClick ? classes.link : ""}
                  >
                    {voucher && voucher.name ? voucher.name : <Skeleton />}
                  </span>
                </TableCell>
                <TableCell>
                  {voucher ? (
                    voucher.startDate !== null ? (
                      voucher.startDate
                    ) : (
                      "-"
                    )
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell>
                  {voucher ? (
                    voucher.endDate !== null ? (
                      voucher.endDate
                    ) : (
                      "-"
                    )
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={classes.textRight}>
                  {voucher &&
                  voucher.discountValueType &&
                  voucher.discountValue ? (
                    <Money
                      amount={voucher.discountValue}
                      currency={
                        voucher.discountValueType === "PERCENTAGE"
                          ? "%"
                          : currency
                      }
                      typographyProps={{ className: classes.tableCellFont }}
                    />
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={classes.textRight}>
                  {voucher ? (
                    voucher.limit !== null ? (
                      <Money
                        amount={voucher.limit.amount}
                        currency={voucher.limit.currency}
                        typographyProps={{ className: classes.tableCellFont }}
                      />
                    ) : (
                      "-"
                    )
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>{i18n.t("No customers found")}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
);
VoucherList.displayName = "VoucherList";
export default VoucherList;
