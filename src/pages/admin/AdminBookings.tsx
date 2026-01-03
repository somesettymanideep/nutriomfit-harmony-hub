import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Calendar, User, Phone, Mail, Clock, Filter } from "lucide-react";
import { getBookings, updateBookingStatus, deleteBooking, BookingSubmission } from "@/lib/adminStore";
import { toast } from "sonner";
import { format } from "date-fns";

const AdminBookings = () => {
  const [bookings, setBookings] = useState<BookingSubmission[]>(getBookings());
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const refreshBookings = () => {
    setBookings(getBookings());
  };

  const handleStatusChange = (id: string, status: BookingSubmission['status']) => {
    updateBookingStatus(id, status);
    refreshBookings();
    toast.success(`Booking ${status}`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      deleteBooking(id);
      refreshBookings();
      toast.success("Booking deleted");
    }
  };

  const filteredBookings = statusFilter === "all" 
    ? bookings 
    : bookings.filter(b => b.status === statusFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground">
            {bookings.length} total bookings • {bookings.filter(b => b.status === 'pending').length} pending
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bookings</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-12 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display font-semibold text-foreground mb-2">No bookings found</h3>
            <p className="text-muted-foreground">
              {statusFilter === "all" 
                ? "Booking submissions will appear here"
                : `No ${statusFilter} bookings`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="border-border">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <User size={16} />
                        {booking.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {format(new Date(booking.submittedAt), 'PPp')}
                      </p>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                  
                  <div className="space-y-1.5 text-sm">
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Phone size={14} />
                      {booking.whatsapp}
                    </p>
                    {booking.email && (
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Mail size={14} />
                        {booking.email}
                      </p>
                    )}
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={14} />
                      {booking.timeSlot}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Select
                      value={booking.status}
                      onValueChange={(value: BookingSubmission['status']) => 
                        handleStatusChange(booking.id, value)
                      }
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(booking.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">{booking.whatsapp}</p>
                        {booking.email && (
                          <p className="text-xs text-muted-foreground">{booking.email}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{booking.timeSlot}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(booking.submittedAt), 'PP')}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={booking.status}
                        onValueChange={(value: BookingSubmission['status']) => 
                          handleStatusChange(booking.id, value)
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(booking.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminBookings;
